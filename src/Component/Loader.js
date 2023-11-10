import React, { useEffect, useState } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../Theme/Index";

export default function Loader(props) {
  const [loader, setLoader] = useState(props.isLoading);

  useEffect(() => {
    setLoader(props.isLoading);
  }, [props]);

  return (
    <Modal visible={loader} transparent>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.shadowColor,
        }}
      >
        <ActivityIndicator style={{ alignSelf: "center" }} size="large" />
      </View>
    </Modal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  isLoading: false,
};
