const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, PageBreak,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, LevelFormat,
  Footer, PageNumber, NumberFormat, PositionalTab, PositionalTabAlignment,
  PositionalTabRelativeTo, PositionalTabLeader, VerticalAlign, SectionType, TabStopType, LeaderType, Tab,
} = require("docx");
const { JUDUL, kataPengantar, body, pustaka } = require("./content");

const tocPages = fs.existsSync("toc_pages.json") ? JSON.parse(fs.readFileSync("toc_pages.json")) : {};
const FONT = "Times New Roman";
const SZ = 24; // 12pt
const LINE = 360; // 1.5 spasi
const INDENT = 720; // 1,27 cm

// ---- inline markup: **bold**, _italic_
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|_[^_]+_)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(...runs(tok.slice(2, -2), { ...base, bold: true }));
    else out.push(new TextRun({ text: tok.slice(1, -1), ...base, italics: true }));
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const para = (text, o = {}) => new Paragraph({
  alignment: o.align ?? AlignmentType.JUSTIFIED,
  indent: o.noIndent ? undefined : { firstLine: INDENT },
  spacing: { line: LINE, after: o.after ?? 0, before: o.before ?? 0 },
  children: runs(text, o.run || {}),
});

// ---- numbering: satu referensi per daftar agar penomoran selalu mulai dari 1
const numberingConfigs = [];
let listCount = 0;
function list(style, items, leftBase = 0) {
  const ref = `list${listCount++}`;
  numberingConfigs.push({
    reference: ref,
    levels: [{
      level: 0,
      format: style === "alpha" ? LevelFormat.LOWER_LETTER : LevelFormat.DECIMAL,
      text: style === "alpha" ? "%1." : "%1.",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: leftBase + 425, hanging: 425 } } },
    }],
  });
  return items.map((it) => new Paragraph({
    numbering: { reference: ref, level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE },
    children: runs(it),
  }));
}

// ---- tabel
const border = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const borders = { top: border, bottom: border, left: border, right: border };
function table(b) {
  const total = b.widths.reduce((a, c) => a + c, 0);
  const cell = (text, i, header) => new TableCell({
    width: { size: b.widths[i], type: WidthType.DXA },
    borders,
    verticalAlign: VerticalAlign.CENTER,
    shading: header ? { fill: "D9D9D9", type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: header || (b.center || []).includes(i) ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { line: 240 },
      children: runs(text, { size: 22, bold: header || undefined }),
    })],
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: b.widths,
    rows: [
      new TableRow({ tableHeader: true, children: b.header.map((h, i) => cell(h, i, true)) }),
      ...b.rows.map((r) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, i, false)) })),
    ],
  });
}

// ---- heading
const headingMark = []; // urutan heading untuk daftar isi
function h1(bab, text, pageBreak = true) {
  headingMark.push({ level: 1, text: bab ? `${bab} ${text}` : text, key: bab ? `${bab} ${text}` : text });
  const children = bab ? [new TextRun({ text: bab, bold: true }), new TextRun({ text, bold: true, break: 1 })]
    : [new TextRun({ text, bold: true })];
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, pageBreakBefore: pageBreak,
    spacing: { line: LINE, after: 360 }, children,
  });
}
function h2(text) {
  headingMark.push({ level: 2, text, key: text });
  return new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, spacing: { line: LINE, before: 240 }, children: [new TextRun({ text, bold: true })] });
}
function h3(text) {
  headingMark.push({ level: 3, text, key: text });
  return new Paragraph({ heading: HeadingLevel.HEADING_3, keepNext: true, indent: { left: 284 }, spacing: { line: LINE, before: 120 }, children: [new TextRun({ text, bold: true })] });
}

// ================= COVER =================
const center = (text, o = {}) => new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { line: o.line ?? 276, before: o.before ?? 0, after: o.after ?? 0 },
  children: [new TextRun({ text, bold: o.bold, size: o.size ?? SZ, italics: o.italics })],
});
const cover = [
  center("MAKALAH", { bold: true, size: 28, after: 240 }),
  center(JUDUL, { bold: true, size: 28, line: 360, after: 480 }),
  center("Disusun untuk Memenuhi Tugas Mata Kuliah Hubungan Industrial", { after: 120 }),
  center("Dosen Pengampu: [Nama Dosen]", { after: 720 }),
  center("[LOGO UMS]", { italics: true, before: 480, after: 480 }),
  center("[Sisipkan logo Universitas Muhammadiyah Surakarta di sini]", { italics: true, size: 20, after: 960 }),
  center("Disusun oleh:", { after: 120 }),
  center("Nama  : [Nama Mahasiswa]"),
  center("NIM    : [NIM]", { after: 1200 }),
  center("PROGRAM STUDI [NAMA PROGRAM STUDI]", { bold: true }),
  center("FAKULTAS [NAMA FAKULTAS]", { bold: true }),
  center("UNIVERSITAS MUHAMMADIYAH SURAKARTA", { bold: true }),
  center("2026", { bold: true }),
];

// ================= KATA PENGANTAR =================
const front = [];
front.push(h1(null, "KATA PENGANTAR", false));
for (const k of kataPengantar) {
  if (typeof k === "string") front.push(para(k, { noIndent: k.startsWith("_") }));
  else front.push(...list(k.list, k.items));
}
front.push(new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { line: LINE, before: 360 }, children: [new TextRun("Surakarta, September 2026")] }));
front.push(new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { line: LINE, before: 960 }, children: [new TextRun("Penulis")] }));

// ================= ISI =================
const main = [];
for (const b of body) {
  if (b.t === "h1") main.push(h1(b.bab, b.text, main.length > 0));
  else if (b.t === "h2") main.push(h2(b.text));
  else if (b.t === "h3") main.push(h3(b.text));
  else if (b.t === "p") main.push(para(b.text, { noIndent: b.noIndent }));
  else if (b.t === "list") main.push(...list(b.style, b.items));
  else if (b.t === "caption") main.push(new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { line: 276, before: 240, after: 120 }, children: runs(b.text, { bold: true }) }));
  else if (b.t === "table") main.push(table(b));
  else if (b.t === "source") main.push(new Paragraph({ spacing: { line: 276, before: 60, after: 240 }, children: runs(b.text, { size: 20, italics: true }) }));
}
// Daftar pustaka
main.push(h1(null, "DAFTAR PUSTAKA", true));
let group = [];
const flush = () => {
  group.forEach((t) => main.push(new Paragraph({
    alignment: AlignmentType.LEFT, indent: { left: 720, hanging: 720 },
    spacing: { line: 276, after: 160 }, children: runs(t),
  })));
  group = [];
};
let curGroup = "";
for (const item of pustaka) {
  if (typeof item === "object") {
    flush(); curGroup = item.group;
    main.push(new Paragraph({ keepNext: true, spacing: { line: LINE, before: 200, after: 120 }, children: [new TextRun({ text: item.group, bold: true })] }));
  } else group.push(item);
  if (curGroup === "Sumber Internet") group.sort();
}
flush();

// ================= DAFTAR ISI (manual, dua tahap) =================
const TEXTW = 11906 - 2268 - 1701;
const tocLine = (text, page, level) => new Paragraph({
  indent: { left: level === 1 ? 0 : level === 2 ? 425 : 850, right: 500 },
  tabStops: [{ type: TabStopType.RIGHT, position: TEXTW, leader: LeaderType.DOT }],
  spacing: { line: 300, before: level === 1 ? 120 : 0 },
  children: [
    new TextRun({ text, bold: level === 1 }),
    new TextRun({ children: [new Tab(), String(tocPages[text] ?? "00")] }),
  ],
});
const toc = [h1(null, "DAFTAR ISI", true)];
headingMark.unshift({ level: 1, text: "HALAMAN JUDUL", key: "HALAMAN JUDUL" });
for (const hm of headingMark) {
  if (hm.text === "DAFTAR ISI") continue;
  toc.push(tocLine(hm.text, hm.key, hm.level));
}
// tocLine memakai tocPages[text]; kunci = teks heading
fs.writeFileSync("headings.json", JSON.stringify(headingMark.map((h) => h.text), null, 1));

// ================= DOKUMEN =================
const page = { size: { width: 11906, height: 16838 }, margin: { top: 1701, right: 1701, bottom: 1701, left: 2268 } };
const footer = (fmt) => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT] })] })] });

const doc = new Document({
  creator: "Mahasiswa UMS",
  title: JUDUL,
  styles: {
    default: { document: { run: { font: FONT, size: SZ } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: SZ, bold: true, color: "000000" }, paragraph: { outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: SZ, bold: true, color: "000000" }, paragraph: { outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: SZ, bold: true, color: "000000" }, paragraph: { outlineLevel: 2 } },
    ],
  },
  numbering: { config: numberingConfigs },
  sections: [
    { properties: { page }, children: cover },
    { properties: { page: { ...page, pageNumbers: { start: 2, formatType: NumberFormat.LOWER_ROMAN } }, type: SectionType.NEXT_PAGE },
      footers: { default: footer() }, children: [...front, ...toc] },
    { properties: { page: { ...page, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } }, type: SectionType.NEXT_PAGE },
      footers: { default: footer() }, children: main },
  ],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(process.argv[2] || "makalah.docx", buf); console.log("ok"); });
