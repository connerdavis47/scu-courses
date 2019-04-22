import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

const carouselStyle = {
  color: 'black',
  backgroundColor: 'white',
  border: 'solid',
  borderColor: 'black',
};

const primaryStyle = {
  color: 'white',
  backgroundColor: '#862633',
  border: 'solid',
  borderColor: 'black',
};

const Schedule1 = [
  'C1',
  'C2',
  'C3',
  'C4',
];
const Schedule2 = [
  'C5',
  'C6',
  'C7',
  'C8',
];

class Schedules extends Component {
  
  render() {
    return (
      <div>
        <div>
          <h1>Schedules</h1>
        </div>
        <div>
          <div>
            <table>
              <tr style={ primaryStyle }>
                <th style={ primaryStyle }>#</th>
                <th style={ primaryStyle }>Dept</th>
                <th style={ primaryStyle }>Course</th>
                <th style={ primaryStyle }>Days</th>
                <th style={ primaryStyle }>Time Start</th>
                <th style={ primaryStyle }>Time End</th>
                <th style={ primaryStyle }>Professor</th>
              </tr>
              <tr  style={ primaryStyle }>
                <td style={ primaryStyle }>1</td>
                <td style={ primaryStyle }>COEN</td>
                <td style={ primaryStyle }>10</td>
                <td style={ primaryStyle }>MWF</td>
                <td style={ primaryStyle }>9:15</td>
                <td style={ primaryStyle }>10:20</td>
                <td style={ primaryStyle }>Figueira</td>
              </tr>
              <tr  style={ primaryStyle }>
                <td style={ primaryStyle }>2</td>
                <td style={ primaryStyle }>MATH</td>
                <td style={ primaryStyle }>11</td>
                <td style={ primaryStyle }>MWF</td>
                <td style={ primaryStyle }>1:00</td>
                <td style={ primaryStyle }>2:05</td>
                <td style={ primaryStyle }>Musa</td>
              </tr>
              <tr  style={ primaryStyle }>
                <td style={ primaryStyle }>3</td>
                <td style={ primaryStyle }>ENGR</td>
                <td style={ primaryStyle }>1</td>
                <td style={ primaryStyle }>W</td>
                <td style={ primaryStyle }>2:15</td>
                <td style={ primaryStyle }>3:20</td>
                <td style={ primaryStyle }>Figueira</td>
              </tr>
            </table>
          </div>
        </div>
    
        <Carousel showThumbs={false}>
          <div>
            <table>
              <tr style={ carouselStyle }>
                <th style={ carouselStyle }>#</th>
                <th style={ carouselStyle }>Dept</th>
                <th style={ carouselStyle }>Course</th>
                <th style={ carouselStyle }>Days</th>
                <th style={ carouselStyle }>Time Start</th>
                <th style={ carouselStyle }>Time End</th>
                <th style={ carouselStyle }>Professor</th>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>COEN</td>
                <td style={ carouselStyle }>10</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>9:15</td>
                <td style={ carouselStyle }>10:20</td>
                <td style={ carouselStyle }>Figueira</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>2</td>
                <td style={ carouselStyle }>MATH</td>
                <td style={ carouselStyle }>11</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>1:00</td>
                <td style={ carouselStyle }>2:05</td>
                <td style={ carouselStyle }>Musa</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>3</td>
                <td style={ carouselStyle }>ENGR</td>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>W</td>
                <td style={ carouselStyle }>2:15</td>
                <td style={ carouselStyle }>3:20</td>
                <td style={ carouselStyle }>Figueira</td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr style={ carouselStyle }>
                <th style={ carouselStyle }>#</th>
                <th style={ carouselStyle }>Dept</th>
                <th style={ carouselStyle }>Course</th>
                <th style={ carouselStyle }>Days</th>
                <th style={ carouselStyle }>Time Start</th>
                <th style={ carouselStyle }>Time End</th>
                <th style={ carouselStyle }>Professor</th>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>COEN</td>
                <td style={ carouselStyle }>10</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>9:15</td>
                <td style={ carouselStyle }>10:20</td>
                <td style={ carouselStyle }>Atkinson</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>2</td>
                <td style={ carouselStyle }>MATH</td>
                <td style={ carouselStyle }>11</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>1:00</td>
                <td style={ carouselStyle }>2:05</td>
                <td style={ carouselStyle }>Barria</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>3</td>
                <td style={ carouselStyle }>ENGR</td>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>W</td>
                <td style={ carouselStyle }>2:15</td>
                <td style={ carouselStyle }>3:20</td>
                <td style={ carouselStyle }>Jack</td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr style={ carouselStyle }>
                <th style={ carouselStyle }>#</th>
                <th style={ carouselStyle }>Dept</th>
                <th style={ carouselStyle }>Course</th>
                <th style={ carouselStyle }>Days</th>
                <th style={ carouselStyle }>Time Start</th>
                <th style={ carouselStyle }>Time End</th>
                <th style={ carouselStyle }>Professor</th>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>COEN</td>
                <td style={ carouselStyle }>10</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>9:15</td>
                <td style={ carouselStyle }>10:20</td>
                <td style={ carouselStyle }>Atkinson</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>2</td>
                <td style={ carouselStyle }>MATH</td>
                <td style={ carouselStyle }>11</td>
                <td style={ carouselStyle }>MWF</td>
                <td style={ carouselStyle }>1:00</td>
                <td style={ carouselStyle }>2:05</td>
                <td style={ carouselStyle }>Barria</td>
              </tr>
              <tr  style={ carouselStyle }>
                <td style={ carouselStyle }>3</td>
                <td style={ carouselStyle }>ENGR</td>
                <td style={ carouselStyle }>1</td>
                <td style={ carouselStyle }>W</td>
                <td style={ carouselStyle }>2:15</td>
                <td style={ carouselStyle }>3:20</td>
                <td style={ carouselStyle }>Jack</td>
              </tr>
            </table>
          </div>
        </Carousel>
    
        <div className="carousel-container">
    
        </div>
      </div>
    )
  }
  
}

export default Schedules;
