import React from 'react';
import state from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { 
    headContainerAnimation, 
    headContentAnimation, 
    headTextAnimation, 
    slideAnimation  
} from '../config/motion';
import { CustomButton } from '../components';

const Home = () => {
    const snap = useSnapshot(state);
    
  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img
                        src='./threejs.png'
                        alt='logo'
                        className='w-8 h-8 object-contain'
                    />
                </motion.header>
                <motion.div className='home-content' {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            LET'S <br className='xl:block hidden'/>
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                        <p className='max-w-md font-normal text-gray-600 text-base'>
                        Boost your energy with our revolutionary 3D customization tool! Create your exclusive energy drink and define your unique taste. <strong> Unleash your imagination </strong> {" "}  and elevate your energy experience.
                        </p>
                        <CustomButton
                            title="Customize It"
                            handleClick={() => state.intro = false}
                            customStyles="w-1/3"
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home;
