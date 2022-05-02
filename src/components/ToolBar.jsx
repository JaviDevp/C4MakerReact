import React from 'react'
import { NodeToolBar } from './ToolbarNodes/NodeToolBar';


export const ToolBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <aside >
      <div className="description">Arrastra los elementos.</div> 
      
      <div onDragStart={(event) => onDragStart(event, 'SoftwareSystem')} draggable>
        <NodeToolBar path='/assets/SoftwareSystem.jpg' name='Soft. System'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Person')} draggable>
        <NodeToolBar path='/assets/Person.jpg' name='Person'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'ExternalPerson')} draggable>
        <NodeToolBar path='/assets/ExternalPerson.jpg' name='External Person'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Database')} draggable>
        <NodeToolBar path='/assets/Database.jpg' name='Database'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'ExternalSoftwareSystem')} draggable>
        <NodeToolBar path='/assets/ExternalSoftwareSystem.jpg' name='External System'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Container')} draggable>
        <NodeToolBar path='/assets/Container.jpg' name='Container'/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Component')} draggable>
        <NodeToolBar path='/assets/Component.jpg' name='Component'/>
      </div>


    </aside>
  );
}

