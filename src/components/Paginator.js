import React from 'react'
import { Pagination } from 'react-bootstrap'


const Paginator = (props) => {

  const current = parseInt(props.current, 10)
  const pages = props.pages
  let firstNum = 1
  let lastNum = pages
  if (pages > 9) {
    firstNum = Math.max(1, current - 4)
    lastNum = Math.min(pages, firstNum + 8)
    firstNum = Math.max(1, lastNum - 8)
  }

  let items = []
  items.push(
    <Pagination.Item key={-9999999} id={1} onClick={props.handlePageSelect}>
      &#8676;
    </Pagination.Item>)
  items.push(
    <Pagination.Item key={-9999998} id={Math.max(1, current - 1)} onClick={props.handlePageSelect}>
      &#8592;
    </Pagination.Item>)
  if (firstNum > 1) {
    items.push(
      <Pagination.Item key={-9999997} id={Math.max(1, current - 9)} onClick={props.handlePageSelect}>
        &#8230;
      </Pagination.Item>)
  }
  for (let number = firstNum; number <= lastNum; number++) {
    items.push(
      <Pagination.Item key={number} id={number} active={number === current} onClick={props.handlePageSelect}>
        {number}
      </Pagination.Item>
    );
  }
  if (lastNum < pages) {
    items.push(
      <Pagination.Item key={9999997} id={Math.min(pages, current + 9)} onClick={props.handlePageSelect}>
        &#8230;
      </Pagination.Item>)
  }
  items.push(
    <Pagination.Item key={9999998} id={Math.min(pages, current + 1)} onClick={props.handlePageSelect}>
      &#8594;
    </Pagination.Item>)
  items.push(
    <Pagination.Item key={9999999} id={pages} onClick={props.handlePageSelect}>
      &#8677;
    </Pagination.Item>)

  // We won't define onClick on the top level Pagination because then clicking outside the buttons would
  // trigger unnecessary events without a valid id.
  return (
    <Pagination>
      {items}
    </Pagination>
  )

}

export default Paginator