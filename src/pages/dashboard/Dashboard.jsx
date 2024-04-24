import { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div className=' rounded-4 px-4 py-2' style={{marginRight: "2vh", marginBottom: "2vh"}}>
        <h1 className='fs-2'>Dashboard</h1>
        <div className="d-flex gap-3">
            <div className='rounded-4 bg-secondary fst-italic text-center px-4 pb-4'>
                <div className='fw-bold m-0' style={{fontSize: 84}}>8</div>
                <div className='m-0'>total menu</div>
            </div>
            <div className='rounded-4 bg-primary fst-italic text-center px-4 pb-4'>
                <div className='fw-bold m-0' style={{fontSize: 84}}>8</div>
                <div className='m-0'>total table</div>
            </div>
        </div>
      </div>
    )
  }
}
