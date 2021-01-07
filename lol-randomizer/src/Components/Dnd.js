import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "black",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 150,
  height: 750,
});

const Dnd = ({ players, setPlayers, handleRandomize }) => {

  useEffect(() => {
    handleRandomize();
  // eslint-disable-next-line
  }, [players])
  /**
 * A semi-generic way to handle multiple lists. Matches
 * the IDs of the droppable container to the names of the
 * source arrays stored in the state.
 */
  const id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  const getList = (id) => {
    const list = players[id2List[id]]
    return list;
  };

  const onDragEnd = (result) => {

    const { source, destination } = result;
    if (!destination) {
      return;
    }

    // re-order the list
    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      const sourceList = getList(source.droppableId);
      const destList = getList(destination.droppableId);
      if (sourceList && destList) {
        const result = move(
          sourceList,
          destList,
          source,
          destination
        );

        setPlayers({
          items: result.droppable,
          selected: result.droppable2
        });
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '3rem' }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <p style={{
                  marginTop: '1rem',
                  color: "black",
                  marginLeft: '2.5rem',
                }}>Available</p>
                {players.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div style={{ marginRight: '5rem' }}>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <p style={{
                  marginTop: '1rem',
                  color: "black",
                  marginLeft: '2.5rem',
                }}>Selected</p>
                {players.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}



export default Dnd;
