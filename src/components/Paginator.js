import React from 'react'
import { Pagination } from 'react-bootstrap'


const Paginator = (props) => {

  let items = []
  for (let number = 1; number <= props.pages; number++) {
    items.push(
      <Pagination.Item key={number} id={number} active={number === props.currentPage}>
        {number}
      </Pagination.Item>,
    );
  }
  
  return (
    <Pagination onClick={props.handlePageSelect}>
      {items}
    </Pagination>
  )

}

export default Paginator