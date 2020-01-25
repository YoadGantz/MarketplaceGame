import React from "react";
import MediaUrlsList from '../media-url-list/MediaUrlList';
import Thumbnail from '../thumbnail/Thumbnail';
import TagList from '../tag-list/TagList';


export default function InputForm(props) {
    const { inputChange, addMediaAndTags, onSubmit, removeMediaAndTags,
        form: { price, publishedAt, title, mediaUrls, tags, thumbnail, description } } = props
    let addedTags;
    let addedUrls;
    let addedThumbnail
    if (mediaUrls && mediaUrls.length) {
        addedUrls = (<MediaUrlsList removeMediaAndTags={removeMediaAndTags} mediaUrls={mediaUrls} />)
    }
    if (tags && tags.length) {
        addedTags = (<TagList removeMediaAndTags={removeMediaAndTags} tags={tags} />)
    }
    if (thumbnail) {
        addedThumbnail = <Thumbnail thumbnail={thumbnail} removeMediaAndTags={removeMediaAndTags} />
    }

    return <div className="edit-container">
        <p> Title : </p>
        <input type="text" onChange={inputChange} value={title} placeholder="title" name="title" />
        <p>Publish Date</p>
        <input type="date" onChange={inputChange} value={publishedAt} name="publishedAt" />
        <p> Descripiton: </p>
        <textarea type="text" onChange={inputChange} placeholder="description" name="description" value={description} />
        <p> Thumbnail Img: </p>
        <input type="file" onChange={addMediaAndTags} placeholder="thumbnail" name="thumbnail" />
        {addedThumbnail}
        <p> Media: </p>
        <div>
            <input type="file" onChange={addMediaAndTags} placeholder="Put your image Urls here" name="mediaUrls" multiple />
            <div className="flex wrap">{addedUrls}</div>
        </div>
        <p>Price: </p>
        <input type="number" onChange={inputChange} placeholder="price" name="price" value={price} />
        <p>Tags:</p>
        <input type="tags" onChange={inputChange} placeholder="tags" name="currTag" />
        <button name="tags" onClick={addMediaAndTags}>
            Add Tag
          </button>
        <div className="flex">{addedTags}</div>
        <button onClick={onSubmit}>Submit</button>
    </div>



}