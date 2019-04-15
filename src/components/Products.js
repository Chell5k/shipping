import React from 'react';
/*
function: CalcShipDate
Calculate delivery date, given a trip duration, and a status for weekend shipping.
*/
const CalcShipDate = ({duration, shipOnWeekends}) => {
  //check shipping duration. if not 1 or greater, return.
  if (duration <= 1) {
    return 'Check with vendor'
  }
  /*
  deliveryDate is set temporarily to the shipping start date, which is the current day.
  At end of function, it will be assigned the value of delivery date.
  */
  const deliveryDate = new Date();
  /*shipDays represents the travel status of each day of the week.
  Default setting is true for week days and false for non-shipping days.
  */
  const shipDays = [
    false,
    true,
    true,
    true,
    true,
    true,
    false
  ];
  if (shipOnWeekends) {
    shipDays[0] = true;
    shipDays[6] = true;
  }
  //daysTraveled corresponds to shipping duration. It will exclude weekends if shipOnWeekends is false.
  let daysTraveled = 0;
  //start is the first day of the trip. Values range from 0-6, 0=>Sunday, 1=>Monday, etc.
  let start = deliveryDate.getDate();
  //calendarDays is the actual number of elapsed days for the trip.
  let calendarDays = 0;
  let day;
  while (daysTraveled < duration) {
    calendarDays++;
    //Figure out which day of the week it is so we can compare to shipDays.
    day = (calendarDays === 1 ? start : ++day ) % 7;
    let validTravelDay = shipDays[day];
    if (validTravelDay) {
      daysTraveled++;
    }
  }
  /*
  When we calculated elapsed days, we included the start day. So a two day trip includes the start day (day 1) and the next shipping day. But, Javascript date objects don't include the start day, so we subtract 1.
  */
  const futureDate = deliveryDate.getDate() + (--calendarDays);
  deliveryDate.setDate(futureDate);
  return deliveryDate.toLocaleDateString('en-US');
}

const Products = ({products}) => {
  const ProductList = products.map(product =>{
    return(
      <div key={product.productId}>
        <div className="col s12 m6 l6">
          <div className="card center-align deep-purple lighten-3 ">
            <div className="card-content white-text">
              <p>Product #: {product.productId}</p>
              <p>Name: {product.productName}</p>
              <p>Amount in stock: {product.inventoryQuantity}</p>
              <p>Delivery date: <CalcShipDate
                  duration={product.maxBusinessDaysToShip}
                  shipOnWeekends={product.shipOnWeekends}
                /></p>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <div className="row">
      {ProductList}
    </div>
  )
}

export default Products;
