import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'

function Footer() {
  return (
    <div>
        <section className='mt-4' style={{backgroundColor:"#1f1f1f"}}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                    <div class="wrap">
                        <div class="social">
                           <i class="fa-brands fa-github git icons"><GitHubIcon className='fs-1'></GitHubIcon></i>
                           <i class="fa-brands fa-instagram insta icons"><InstagramIcon className='fs-1'></InstagramIcon></i>
                        </div>
                        <p className='text-center text-white fs-5 pt-3 copyright'>Copyright © Abdus Samad</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer