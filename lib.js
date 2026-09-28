const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign,
} = require('docx');

const FONT = 'Times New Roman';
const W = 9354;
const HEAD = 'D9D9D9', SUB = 'F2F2F2', TOTL = 'E8E8E8', WARN = 'FFF2CC';
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB };

const f  = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp = n => 'Rp' + f(n);
const pc = n => String(n.toFixed(2)).replace('.', ',') + '%';
const num = n => n.toFixed(2).replace('.', ',');

const run = (t, o = {}) => new TextRun({
  text: t, font: FONT, size: o.size || 21,
  bold: !!o.bold, italics: !!o.italics,
});

const p = (t, o = {}) => new Paragraph({
  children: Array.isArray(t) ? t : [run(t, o)],
  alignment: o.align || AlignmentType.LEFT,
  spacing: { before: o.before || 0, after: o.after === undefined ? 100 : o.after, line: o.line || 280 },
  indent: o.indent,
});
const pj = (t, o = {}) => p(t, Object.assign({}, o, { align: AlignmentType.JUSTIFIED }));
const h1 = t => p(t, { bold: true, size: 24, before: 320, after: 140 });
const h2 = t => p(t, { bold: true, size: 21, before: 220, after: 100 });

function cell(text, width, o = {}) {
  const arr = Array.isArray(text) ? text : [text];
  return new TableCell({
    children: arr.map(t => new Paragraph({
      children: [run(t, o)],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 20, after: 20, line: 250 },
    })),
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 40, bottom: 40, left: 90, right: 90 },
    columnSpan: o.span,
  });
}

const tbl = (cw, rows, o = {}) => new Table({
  columnWidths: cw,
  width: { size: W, type: WidthType.DXA },
  borders: o.plain ? NO_BORDERS : undefined,
  rows,
});

function kv(pairs, w1) {
  w1 = w1 || 2900;
  const cw = [w1, 300, W - w1 - 300];
  return tbl(cw, pairs.map(pr => new TableRow({
    children: [
      cell(pr[0], cw[0], { bold: true }),
      cell(':', cw[1], { align: AlignmentType.CENTER }),
      cell(pr[1], cw[2]),
    ],
  })), { plain: true });
}

const listed = (items, ref) => items.map(t => new Paragraph({
  children: [run(t)],
  numbering: { reference: ref, level: 0 },
  spacing: { before: 40, after: 60, line: 280 },
  alignment: AlignmentType.JUSTIFIED,
}));
const numlist = items => listed(items, 'ln');
const ltrlist = items => listed(items, 'lh');

// baris tabel dua kolom label:nilai, w = 0 biasa, 1 subtotal, 2 total
function rows2(cw, data) {
  return data.map(d => new TableRow({
    children: [
      cell(d[0], cw[0], { bold: d[2] > 0, fill: d[2] === 2 ? HEAD : d[2] === 1 ? TOTL : undefined }),
      cell(d[1], cw[1], { bold: d[2] > 0, fill: d[2] === 2 ? HEAD : d[2] === 1 ? TOTL : undefined, align: AlignmentType.RIGHT }),
    ],
  }));
}

function build(children, title) {
  return new Document({
    creator: 'Praktik Peradilan Perdata',
    title: title,
    numbering: {
      config: [
        { reference: 'ln', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START,
          style: { paragraph: { indent: { left: 460, hanging: 340 } } } }] },
        { reference: 'lh', levels: [{ level: 0, format: 'lowerLetter', text: '%1.', alignment: AlignmentType.START,
          style: { paragraph: { indent: { left: 460, hanging: 340 } } } }] },
      ],
    },
    styles: { default: { document: { run: { font: FONT, size: 21 } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, right: 1134, bottom: 1134, left: 1418 },
        },
      },
      children: children,
    }],
  });
}

module.exports = { FONT, W, HEAD, SUB, TOTL, WARN, NO_BORDERS,
  f, rp, pc, num, run, p, pj, h1, h2, cell, tbl, kv, numlist, ltrlist, rows2, build,
  AlignmentType, TableRow };
