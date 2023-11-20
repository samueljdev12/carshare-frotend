import { useState, useEffect } from "react";
// Import the "arrow up" icon
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 
import { useLocation } from "react-router-dom";


const Scroll = () => {
    const pathLocation = useLocation().pathname;
    // initialize state
    const [isVisible, setIsVisible] = useState(false);
    const [isToTop, setIsToTop] = useState(false);

    const checkScrollAbility = () => {
      const contentHeight = document.body.scrollHeight;
      const isScrollable = contentHeight > 2500;
      // console.log(`contentHeight: ${contentHeight}`);
      // console.log(`isScrollable: ${isScrollable}`);
      setIsVisible(isScrollable);
    }

    //scroll to function
    const scrollToTop = ()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }

    
    //handle scroll function
    const handleScroll = ()=>{
      if(!isVisible) return;

      const footer = document.querySelector('footer');
      const scrollButton = document.querySelector('.scroll');
      const footerPosition = footer.offsetTop;
      const scrollPosition = window.scrollY;
      
      if(scrollPosition > 1000){
        setIsToTop(true);
      }else{
        setIsToTop(false);
      }
      
      if(scrollPosition > footerPosition - window.innerHeight) {
        // If scroll position is close to the footer
        const distanceToBottom = scrollPosition + window.innerHeight - footerPosition;
        // Set button position above the footer
        scrollButton.style.bottom = `${distanceToBottom + 20}px`;
      } else if (scrollButton) {
        // If scroll position is above the footer, remove style attribute
        scrollButton.style.bottom = '';
      }
    }

    useEffect(()=>{
        checkScrollAbility();
          window.addEventListener('scroll', handleScroll);
        return ()=>{
          window.removeEventListener('scroll', handleScroll);
        }
    }, [pathLocation, document.body.scrollHeight]);


  return (
    <>
      {isVisible && ( <button onClick={isToTop ? scrollToTop : scrollToBottom }  className="scroll main-bg-color">{isToTop ? <FaArrowUp className="scroll-icon h-auto"/> : <FaArrowDown className="scroll-icon h-auto"/>}</button> )}
    </>
  )
}

export default Scroll
