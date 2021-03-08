import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import sr from '../../Assets/bg.jpg';



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

const getAvailableItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "black",
  // change background colour if dragging
  background: isDragging ? "DarkSeaGreen" : "grey",
  borderRadius: '.5rem',
  fontWeight: 'bold',
  // styles we need to apply on draggables
  ...draggableStyle
});

const getSelectedItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "black",
  // change background colour if dragging
  background: isDragging ? "grey" : "DarkSeaGreen",
  borderRadius: '.5rem',
  fontWeight: 'bold',
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  boxShadow: '4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  backgroundImage: `url(${sr})`,
  // backgroundColor: 'rgba(255, 0, 0, .3)',
  backgroundPosition: '-900px -0px',
  backgroundSize: '2000px',
  opacity: '1',
  padding: grid,
  width: 200,
  height: 750,
  borderRadius: '.5rem'
});

const Dnd = ({ available, selected, setAvailable, setSelected }) => {

  const onDragEnd = (result) => {

    const { source, destination } = result;
    if (!destination) {
      return;
    }

    // re-order the list
    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      const sourceList = source.droppableId === 'available' ? available : selected;
      const destList = destination.droppableId === 'available' ? available : selected;
      if (sourceList && destList) {
        const result = move(
          sourceList,
          destList,
          source,
          destination
        );

        setAvailable(result.available);
        setSelected(result.selected);
        localStorage.setItem('selected', JSON.stringify(result.selected));
        localStorage.setItem('available',  JSON.stringify(result.available));
       
       
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '3rem' }}>
          <Droppable droppableId="available">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <p style={{
                  marginTop: '1rem',
                  color: "black",
                  fontWeight: 'bold'
                }}>Available</p>
                {available.map((item, index) => (
                  <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getAvailableItemStyle(
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
        <div >
          <Droppable droppableId="selected">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <p style={{
                  marginTop: '1rem',
                  color: "black",
                  fontWeight: 'bold'
                }}>Selected</p>
                {selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getSelectedItemStyle(
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
