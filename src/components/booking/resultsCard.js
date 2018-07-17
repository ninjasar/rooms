import React from 'react';

import Card from './Card.js';
import './card.css';






const resultsCard = (res) => {
      return res.map(r => {
          return (
            <Card title={r.locationId + ' ' + r.name}>
              {res.indexOf(r) % 2 !== 0 && "Open Time: " + r.openTime}
            </Card>
          )
        <Card title={r.locationId + ' ' + r.name}>
           Open Time: {r.openTime}
           <br/>
           Close Time: {r.closeTime}
           <br/>
           Duration: {r.duration}
           <br/>
           Occupants: {r.occupants}
           <br/>
           Amenities: {r.amenities[0].name}
        </Card>);
      }


}

export default resultsCard;
