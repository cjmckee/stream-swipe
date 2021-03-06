import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { observer } from 'mobx-react';
import { store } from '../store';
import { Typography } from '@material-ui/core';

const root = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden'
};
const text = {
  color:"#FFFFFF",
  textAlign: "center" as "center"
};

const gridList = {
};

const icon =  {
  maxWidth:"100%",
  height:"auto",
};

@observer
export class StreamerGrid extends React.Component {
  render() {
    if (store.likedStreams.length <= 0) {
      return (
        <div style={root}>
          <Typography style={text}>
            No liked streamers this session.
          </Typography>
         </div>
      );
    } else {
      const numCols = Math.min(store.likedStreams.length, 2);
      if (store.likedStreams.length % 2 === 1 && numCols !== 1) {
        return (
          <div style={root}>
            <GridList style={gridList} cols={numCols}>
              <GridListTile style={{backgroundColor:"rgba(255,255,255,0.2)"}}></GridListTile>
              {store.likedStreams.map(tile => (
                <GridListTile key={tile.picture}>
                  <a href={tile.link} target="_blank">
                    <img src={tile.picture} alt={tile.name} style={icon} />
                  </a>
                  <GridListTileBar title={tile.name} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        );
      } else {
        return (
          <div style={root}>
            <GridList style={gridList} cols={numCols}>
              {store.likedStreams.map(tile => (
                <GridListTile key={tile.picture}>
                  <a href={tile.link} target="_blank">
                    <img src={tile.picture} alt={tile.name} style={icon} />
                  </a>
                  <GridListTileBar title={tile.name} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        );
      }
    }
  }
}