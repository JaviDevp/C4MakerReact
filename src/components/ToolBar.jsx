import React from 'react'
import { Database } from './ToolbarNodes/Database';
import { ExternalPerson } from './ToolbarNodes/ExternalPerson';
import { Person } from './ToolbarNodes/Person';
import { SoftwareSystem } from './ToolbarNodes/SoftwareSystem';


export const ToolBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <aside >
      <div className="description">Arrastra los elementos.</div> 
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      
      <div onDragStart={(event) => onDragStart(event, 'SoftwareSystem')} draggable>
        <SoftwareSystem/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Person')} draggable>
        <Person/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'ExternalPerson')} draggable>
        <ExternalPerson/>
      </div>

      <div onDragStart={(event) => onDragStart(event, 'Database')} draggable>
        <Database/>
      </div>
    </aside>
  );
}

