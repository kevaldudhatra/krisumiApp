import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { Colors, CommonStyle } from "../Theme/Index";

export default function AsyncImage(props) {
  const [style] = useState(props.style);
  const [source, setSource] = useState(props.source);
  const [loaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [noUsedImage, setNoUsedImage] = useState(props.noUsedImage);

  useEffect(() => {
    if (source !== props.source) {
      setSource(props.source);
    }
    if (noUsedImage !== props.noUsedImage) {
      setNoUsedImage(props.noUsedImage);
    }
  }, [props.source, props.noUsedImage]);

  function onLoadStart() {
    setLoaded(true);
  }

  function onLoadEnd() {
    setLoaded(false);
  }

  return (
    <View
      style={
        source === noUsedImage
          ? [style, { alignItems: "center", justifyContent: "center" }]
          : style
      }
    >
      <Image
        defaultSource={noUsedImage}
        source={isError ? noUsedImage : source}
        resizeMode={"contain"}
        style={
          source === noUsedImage
            ? [style, { resizeMode: "contain" }]
            : [CommonStyle.resizeModeStyle, style]
        }
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={(errorData) => {
          let { error } = errorData.nativeEvent;
          console.log("error asyncImage => ", error);
          setLoaded(false);
          setError(true);
        }}
      />
      {loaded ? (
        <View style={CommonStyle.positionCenterAsyncImage}>
          <ActivityIndicator color={Colors.white} />
        </View>
      ) : null}
    </View>
  );
}

AsyncImage.propTypes = {
  source: PropTypes.any,
  setNoUsedImage: PropTypes.any,
  style: PropTypes.any,
  onLoadCall: PropTypes.func,
};

AsyncImage.defaultProps = {
  source: "",
  setNoUsedImage: "",
  onLoadCall: () => {},
};
