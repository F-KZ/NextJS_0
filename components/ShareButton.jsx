'use client'
import {
    EmailShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    TwitterIcon,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
  } from "react-share";
  import { FaShare } from "react-icons/fa";
  import React from 'react';
  
  const ShareButton = ({ property }) => {
    const shareUrl = `${process.env.NEXTAUTH_URL}/properties/${property._id}`
    return (
       <>
        <h3 className="text-xl font-bold text-center pt-2">Share This Property:</h3>
        <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
           <FacebookIcon size={40} round={true}/> 
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
           <TwitterIcon size={40} round={true}/> 
        </TwitterShareButton>
        <EmailShareButton 
        url={shareUrl} 
        subject={property.name} 
        body={`check this out :${shareUrl}`}>
           <EmailIcon size={40} round={true}/> 
        </EmailShareButton>
        <WhatsappShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
           <WhatsappIcon size={40} round={true}/> 
        </WhatsappShareButton>
        </div>
       </>

    );
  }
  
  export default ShareButton;
  