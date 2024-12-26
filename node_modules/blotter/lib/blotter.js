import { createClass, DOM as dom, PropTypes as propTypes } from 'react';

export default createClass({
  displayName: 'Blotter',
  propTypes: {
    columnConfig: propTypes.object.isRequired,
    data: propTypes.object.isRequired,
    dataFormatter: propTypes.func.isRequired,
    cssClass: propTypes.string
  },
  render() {
    const p = this.props;
    const colIds = Object.keys(p.columnConfig);
    const data = p.dataFormatter ? p.dataFormatter(p.data) : p.data;

    const headerCols = colIds.map((colId) => {
      const config = p.columnConfig[colId];
      const elemConfig = {};
      elemConfig.className = config.className;
      elemConfig.key = colId;
      return dom.th(elemConfig, config.header);
    });

    function makeDataRow(data, index) {
      const bodyCols = colIds.map((colId) => {
        const elemConfig = {};
        elemConfig.className = p.columnConfig[colId].className;
        elemConfig.key = colId;
        return dom.td(elemConfig, data[colId]);
      });
      return dom.tr({ key: index }, bodyCols);
    }

    return (
      dom.table(null,
        dom.thead(null, dom.tr(null, headerCols)),
        dom.tbody(null, data.map(makeDataRow))
      )
    );
  }
});
