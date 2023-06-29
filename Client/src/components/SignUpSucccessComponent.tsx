import React, { useState } from 'react';

const SignUpSucccessComponent: React.FC = () => {

    return (
       <div className='text-center '>
        <video autoPlay muted loop className="h-[70%] w-[70%] mx-auto object-cover">
                <source src="https://player.vimeo.com/progressive_redirect/playback/818999936/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=30a649929a1cb3e3e1a7dc2362c21073a8422b0d2740325e3ff6719cead2ea3c" type="video/mp4"/>
        </video>
        <h5 className='text-xl font-semibold px-8 mb-5'>You have successfully registered an account</h5>
        <p className='text-base font-semibold text-orange-500 pb-3'>Please verify your email!</p>
       </div>
    );
}

export default SignUpSucccessComponent;