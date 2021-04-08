
import { useEffect, useState  } from 'react';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import styled,  { ThemeProvider } from 'styled-components';
import theme from '@src/theme';

const ListItemInternal = styled.li`
  ${({ theme }) => `
    background-color: $cadet-blue;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    cursor: pointer;
    :hover {
      background-color: ${theme.palette.primary.main};
      color: white;
    }
  `}
`;

const ItemContentCell = styled.div`
  display: flex;
  align-items: center;
`;


interface IListItemProps {
  key: any;
  children?: any;
  onChange: Function;
  item: File;
}
  
function ListItem ({children, item, onChange}: IListItemProps) {
  const [checked, setChecked] = useState(true);

  function onClick () {
    setChecked(!checked);
  }

  useEffect(() => {
    onChange(item, checked);
  });

  return (
    <ThemeProvider theme={theme}>
      <ListItemInternal onClick={onClick}>
        <ItemContentCell>
          { item.type === '' ? <FolderOutlinedIcon /> : <DescriptionOutlinedIcon />}&nbsp;
          { item.name }
        </ItemContentCell>
        { checked ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
      </ListItemInternal>
    </ThemeProvider>
  );
}

  export default ListItem;
