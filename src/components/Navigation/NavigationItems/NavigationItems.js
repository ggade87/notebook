import React, { useState,useRef  }  from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItem2 from "./NavigationItem/NavigationItem2";
import useOutsideClick from "./useOutsideClick";
import Badge from '@material-ui/core/Badge';  
const NavigationItems = (props) => { 
  const ref = useRef();
  useOutsideClick(ref, () => {
    setpclass(classes.popuptext);
    setnotificationclass(classes.popuptext);
  });
  const [pclass, setpclass] = useState(classes.popuptext);
  const [notificationclass, setnotificationclass] = useState(classes.popuptext);
  function myFunction2() {
    setpclass(classes.popuptext);
    setnotificationclass(classes.popuptext);
  }
  function myFunction(id) { 
        var popup = document.getElementById(id);
        if(id === "PopupNotification"){
          setpclass(classes.popuptext);
          if(notificationclass === classes.show){
            setnotificationclass(classes.popuptext);
          }else{
            setnotificationclass(classes.show);
          }
        }else{
          setnotificationclass(classes.popuptext);
          if(pclass === classes.show){
            setpclass(classes.popuptext);
          }else{
            setpclass(classes.show);
          }
        }
    }
return(
  <ul className={classes.NavigationItems}  ref={ref}  >
    <NavigationItem link="/" exact>
    <div className={classes.HomeButton}> <svg onClick={() => myFunction2()} viewBox="0 0 28 28" style={{color:"Red"}} className="a8c37x1j ms05siws hwsy1cff b7h9ocf4 em6zcovv" height="28" width="28"><path d="M17.5 23.979 21.25 23.979C21.386 23.979 21.5 23.864 21.5 23.729L21.5 13.979C21.5 13.427 21.949 12.979 22.5 12.979L24.33 12.979 14.017 4.046 3.672 12.979 5.5 12.979C6.052 12.979 6.5 13.427 6.5 13.979L6.5 23.729C6.5 23.864 6.615 23.979 6.75 23.979L10.5 23.979 10.5 17.729C10.5 17.04 11.061 16.479 11.75 16.479L16.25 16.479C16.939 16.479 17.5 17.04 17.5 17.729L17.5 23.979ZM21.25 25.479 17 25.479C16.448 25.479 16 25.031 16 24.479L16 18.327C16 18.135 15.844 17.979 15.652 17.979L12.348 17.979C12.156 17.979 12 18.135 12 18.327L12 24.479C12 25.031 11.552 25.479 11 25.479L6.75 25.479C5.784 25.479 5 24.695 5 23.729L5 14.479 3.069 14.479C2.567 14.479 2.079 14.215 1.868 13.759 1.63 13.245 1.757 12.658 2.175 12.29L13.001 2.912C13.248 2.675 13.608 2.527 13.989 2.521 14.392 2.527 14.753 2.675 15.027 2.937L25.821 12.286C25.823 12.288 25.824 12.289 25.825 12.29 26.244 12.658 26.371 13.245 26.133 13.759 25.921 14.215 25.434 14.479 24.931 14.479L23 14.479 23 23.729C23 24.695 22.217 25.479 21.25 25.479Z"></path></svg>
    </div>   </NavigationItem>
    {!props.isAuthenticated ? (
       <React.Fragment> 
        <NavigationItem link="/About">About</NavigationItem>
        <NavigationItem link="/Contact">Contact</NavigationItem>
        <NavigationItem link="/auth">Login</NavigationItem>
      </React.Fragment> 
    ) : (
      <React.Fragment> 
         <NavigationItem2   >
      <div className={classes.popup} onClick={() => myFunction("PopupNotification")}>
      <Badge className={classes.Notif} color="secondary" badgeContent={" "}>   <svg  viewBox="0 0 28 28" alt="" className="a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry" height="20" width="20"><path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path></svg>
         </Badge>    <span className={notificationclass} id="PopupNotification" >
            Notification
      </span>
    </div></NavigationItem2>  <NavigationItem2  >
        <div className={classes.popup} onClick={() => myFunction("myPopup")}>
        <svg onClick={myFunction} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
        </svg>
      <span className={pclass} id="myPopup" >
          <NavigationItem link="/About">About</NavigationItem>
          <NavigationItem link="/MainMenuForm">New</NavigationItem> 
          <NavigationItem link="/Contact">Contact</NavigationItem>
          <NavigationItem link="/Account">Account</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
      </span>
    </div></NavigationItem2>
      </React.Fragment>
    )}
  </ul>
  )
}  ;

export default NavigationItems;
