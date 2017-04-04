// @flow
import React from 'react';
import Relay from 'react-relay';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';

const displayName = "PhotoList";

type Props = {
  viewer: any,
};

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10,
});

export default class PhotoList extends React.Component {
  static displayName = displayName;

  props: Props;

  // renderPhotos() {
  //   return this.props.viewer.photos.edges.map(edge =>
  //     <li key={edge.node.id}>{edge.node.id}</li>
  //   );
  // }

  render() {
    return (
      <Masonry
        cellCount={ this.props.viewer.photos.edges.length }
        cellMeasurerCache={ cache }
        cellPositioner={ cellPositioner }
        cellRenderer={ this._cellRenderer }
        height={600}
        width={800}
      />
      // <section className="main">
      //   <ul className="photo-list">
      //     {this.renderPhotos()}
      //   </ul>
      // </section>
    );
  }

  _cellRenderer = ({ index, key, parent, style }: { index: number, key: any, parent: any, style: mixed }) => {
    const datum = this.props.viewer.photos.edges[index];

    const cellRendererProps = {
      cache,
      index,
      key,
      parent,
    };

    console.log(`Invoked _cellRenderer with datum '${JSON.stringify(datum)}'`);

    return (
      <CellMeasurer { ...cellRendererProps }>
        <div style={style}>
          <img
            src={datum.node.url}
            style={{
              height: datum.imageHeight,
              width: datum.imageWidth,
            }}
          />
          <h4>{datum.node.id}</h4>
        </div>
      </CellMeasurer>
    )
  }
}
