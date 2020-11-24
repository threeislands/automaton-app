import * as React from "react";
import * as style from "./ContextMenu.module.scss"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";

function ContextMenu(props) {

  const renderItems = () => {
    return props.items.map(i => {
      return (
        <ListItem key={i.name} role={undefined} dense button
                  onClick={e => props.itemClickHandler(e, i.name)} name={i.name} key={i.name}>
          <ListItemText id={i.name} primary={i.displayText}/>
        </ListItem>
      );
    });
  };

  const getPosition = () => {
    return {
      left: props.x,
      top: props.y
    }
  }

  if (!props.show) return null;

  return (
    <Paper elevation={4} onContextMenu={e => e.preventDefault()} style={getPosition()}
           className={style.contextmenu}>
      <List>
        {renderItems()}
      </List>
    </Paper>
  );

}

export default ContextMenu;