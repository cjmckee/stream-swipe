import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const cody = {
  img: "assets/cody.jpg",
  title: "cory"
};
const chris = {
  img: "assets/chris.jpg",
  title: "ya boy"
};
const neel = {
  img:"assets/neel.jpg",
  title: "nel"
};
const tileData = [cody, chris, neel, cody, cody, neel, neel, chris, chris, neel, cody];

const root = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden'
};

const gridList = {
};
const icon =  {
};

export class StreamerGrid extends React.Component {
    render() {
    return (
      <div style={root}>
        <GridList style={gridList} cols={2}>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar title={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );  
  }
}