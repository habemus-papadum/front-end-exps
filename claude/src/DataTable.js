import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function DataTable({ data }) {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}> 
            {data.map(item => (
              <CSSTransition key={item.id} timeout={500} classNames="item"> 
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
