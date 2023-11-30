import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import confif from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoCan: true,
    stylishCan: false
  });

  const generateTabCntent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile} 
          readFile={readFile}
        />
      default:  
        return null;
    }
  }
  
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }
   
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoCan":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishCan":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result); 
        setActiveFilterTab('')
      })
  }

  return (
    <AnimatePresence>
      {
        !snap.intro && (
          <>
            <motion.div
              key="custom"
              className='absolute top-0 left-0 z-10'
              {...slideAnimation('left')}
            >
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map(tab => (
                    <Tab 
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}
                  {generateTabCntent()}
                </div>
              </div>
            </motion.div>
            <motion.div className='absolute z-10 top-5 right-5'
              {...fadeAnimation}
            >
              <CustomButton
                title="Go Back"
                handleClick={() => state.intro = true}
              />
            </motion.div>

            <motion.div className='filtertabs-container' {...slideAnimation('up')}>
              {FilterTabs.map(tab => (
                      <Tab 
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                      />
              ))}
            </motion.div>
          </>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer;