import React from 'react';
import { Card } from 'semantic-ui-react';


const MusicLinkTile = ({ item }) => (
    <Card image={item.media.oembed.thumbnail_url}
          href={item.url}
          header={item.title}
          meta={item.subreddit}
          description={(item.media.oembed.description||'').substring(0, 150)}/>
);

export default MusicLinkTile;
