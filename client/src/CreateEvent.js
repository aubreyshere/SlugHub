import React from 'react';
import './CreateEvent.css';   

const CreateEvent = () => {
  return (
    <div className="createPage">
      <div className='createBox'>
        <div className='leftBox'>
          <form className='infoFill'>
          <button className='eventImageUpload' type='text'>upload image</button>
          <br />
          <textarea className='eventNameUpload' type='text' placeholder="Event title..."/>
          <br />
          <textarea className='eventdescriptionUpload' type='text' placeholder="Event description..."/>
          </form>
        </div>
        <div className='rightBox'>
          <form className='infoFill'>
            <div className='trackingInput'>
              <div className='dateInput'>
                <textarea className='monthInput'/>
                <textarea className='dayInput'/>
                <textarea className='yearInput'/>
              </div>
              <div className='timeInput'>
                <textarea className='hourInput'/>
                <textarea className='minuteInput'/>
                <textarea className='halfInput'/>
              </div>
            </div>
            <div className='filterInput'>
              idk what to do for this tbh
            </div>
            <button className='postEvent'>Post Event!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;