// import { useEffect, useState  } from 'react';

import './list.scss';
import ListItem from "@components/list-item/list-item";


interface IListProps {
  files: Array<any>;
  onSelectedChange: Function;
}

function List( { files, onSelectedChange }: IListProps) {  
  return (
    <ul className="file-list">
      {
      files.map(file => {
        return (
          <ListItem
            item={file}
            key={file.name}
            onChange={onSelectedChange} />
        );
      })
      }
    </ul>
  );
}

export default List;
