import React, { useContext } from 'react';
import { TrainListContext } from './context/TrainList.jsx';

const Trains = () => {
  const { trains } = useContext(TrainListContext);

  if (!trains || trains.length === 0) {
    return <div className="noTrains">No trains available</div>;
  }

  return (
    <div className="trainsList">
      <h2 className="trainsHeading">Available Trains</h2>
      <ul className="trainsGrid" aria-live="polite">
        {trains.map((train) => {
          const id = train._id;
          const name = train.train_name || train.train_Name || 'Unknown Train';
          const number = train.train_number || train.train_Number || '';
          const from = train.from || train.origin || '-';
          const to = train.to || train.destination || '-';
          const depart = train.departure_time || train.departure_Time || '-';
          const arrive = train.arrival_time || train.arrival_Time || '-';
          const duration = train.total_time || train.total_time || '';
          const fare = train.fare || train.total_fare || '—';

          return (
            <li className="trainCard" key={id}>
              <div className="trainCardInner">
                <div className="trainCardHeader">
                  <div className="trainThumb" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="trainIcon"><path d="M12 2L3 7v9a2 2 0 002 2h1l-1 2h14l-1-2h1a2 2 0 002-2V7l-9-5z" /></svg>
                  </div>

                  <div className="trainInfo">
                    <h3 className="trainTitle">{name}</h3>
                    <div className="trainMeta">
                      <span className="metaRoute"><strong>{from}</strong> → <strong>{to}</strong></span>
                      <span className="metaSmall"> • {number}</span>
                    </div>
                    <div className="trainDetails">
                      <span className="timeBlock">
                        <span className="label">Dep</span>
                        <span className="time">{depart}</span>
                      </span>
                      <span className="timeBlock">
                        <span className="label">Arr</span>
                        <span className="time">{arrive}</span>
                      </span>
                      <span className="pill">{duration}</span>
                    </div>
                  </div>
                </div>

                <div className="trainCardFooter">
                  <div className="fareBlock">
                    <div className="fareLabel">From</div>
                    <div className="fareAmount">₹{fare}</div>
                    <div className="fareSub">per passenger</div>
                  </div>

                  <div className="actions">
                    <button className="trainBtn" type="button" aria-label={`View ${name}`}>View</button>
                    <button className="trainBtn ghost" type="button" aria-label={`Book ${name}`}>Book</button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Trains;