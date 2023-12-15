import React from 'react'

const ItemGroup = (props) => {
    let { items } = props;



    return (
      <>
      <h1>Items</h1>
     <ul  className="list-group overflow-auto" style={{ maxHeight: '300px' }}>
         {console.log(items)}
         {Object.keys((items || {}))
         .sort((a, b) => items[b] - items[a])
         .map((item) =>   { 
  
          return (
              <> 
              
             <li key={item} 
             className="list-group-item"
             >
              {item} {items[item]}%</li>
             </>
         )
         })}
         
   </ul>
   </>
    
      )
}

export default ItemGroup