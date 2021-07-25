import Tippy from "@tippyjs/react/headless";
import classNames from "classnames";
import { Button, Card } from "components";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ImageService } from "services";
import { imagesList } from "store/reducers/imagesSlice";
import { DataStates } from "store/states";
import { Spinner } from "components";
import InfiniteScroller from "../NoteList/InfiniteScroller";

const ImagePicker = ({ onSelect, onCancel, visible }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((image) => ImageService.create(image));
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: "image/*",
    });

  const images = useSelector(imagesList);
  const [active, setActive] = useState(null);

  useEffect(() => {
    ImageService.fetch(true);
  }, []);

  const fetchMore = (lastRef) => {
    console.log(lastRef);
    if (images.length > 0) {
      const refId = images[images.length - 1];
      if (lastRef != refId) {
        ImageService.fetch();
      }
      return refId;
    }
    return null;
  };

  const selectImage = (image) => {
    if (onSelect) onSelect(active);
  };
  return (
    <Tippy
      placement="auto"
      interactive
      visible={visible}
      appendTo={document.body}
      popperOptions={{
        modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
      }}
      render={(attr, content) => (
        <div className="modal">
          <Card className="image_picker">
            <div
              {...getRootProps()}
              className={classNames("pick_area", {
                drop_valid: isDragAccept,
                drop_invalid: isDragReject,
              })}>
              <input type="hidden" {...getInputProps()} />
              <FaPlus />
            </div>
            <div className="w-full overflow-y-auto h-[300px] flex flex-col">
              <div className="list_area">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={classNames("image", {
                      active: image.id == active?.id,
                    })}
                    onClick={() => setActive(image)}>
                    {image.status == DataStates.IN_FLIGHT ? (
                      <Spinner />
                    ) : (
                      <img src={image.url} />
                    )}
                  </div>
                ))}
              </div>
              <InfiniteScroller
                loadingView={<Spinner />}
                fetchMore={fetchMore}
                statusSelector={(state) => state.images.status}
                nextSelector={(state) => state.images.next}
                noneView={
                  <div className="w-full h-full flex-1 flex flex-col  justify-center py-4">
                    <p className="block text-[#dddddd99] text-center">
                      No more images found!
                    </p>
                  </div>
                }
              />
            </div>

            <div className="flex flex-row gap-2 justify-end mt-4">
              <Button
                onClick={() => onCancel()}
                label="Cancel"
                style="secondary"
              />
              <Button
                onClick={() => selectImage()}
                label="Select"
                style="primary"
              />
            </div>
          </Card>
        </div>
      )}
    />
  );
};

export default ImagePicker;

/* 
<Tippy
placement="auto"
interactive
visible={true}
appendTo={document.body}
popperOptions={{
modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
}}
render={(attr, content) => {
console.log(attr);
console.log(content);
return (
    
);
}}
/> 
*/
