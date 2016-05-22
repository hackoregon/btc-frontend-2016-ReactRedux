import React from 'react';
import './DonorCard.css';

const DonorCard = (props) => {
  const donor = props.donor;
  return (
    <div className='DonorCard'>
      <h2>
        <span className='DonorCard-name'>
          {donor.name}
        </span>,
        {donor.locationDescription}</h2>
      <div>
        {donor.title}, {donor.organization}<br />
        #14 Donor to Oregon
      </div>
    </div>
  );
};
export default DonorCard;