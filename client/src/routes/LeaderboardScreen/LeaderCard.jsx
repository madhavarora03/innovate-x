// LeaderCard.js
// import React from 'react';
import PropTypes from 'prop-types';
import './LeaderCard.css'; // Add this CSS file for styling

const LeaderCard = ({ name, description, points, img, rank }) => {
    return (
        <div className={`leader-card ${rank <= 3 ? 'top-rank' : ''}`}>
            <img src={img} alt={name} className="leader-img" />
            <div className="leader-info">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>Points: {points}</p>
                <span className="rank">
                    {rank <= 3 ? (
                        <span className="medal">
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                        </span>
                    ) : (
                        `Rank: ${rank}`
                    )}
                </span>
            </div>
        </div>
    );
};

LeaderCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
};

export default LeaderCard;