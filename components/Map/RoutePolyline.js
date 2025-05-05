import React from "react";
import { Polyline } from "react-native-maps";

const RoutePolyline = ({ coordinates }) => {
  if (!coordinates || coordinates.length === 0) return null;

  return (
    <Polyline coordinates={coordinates} strokeColor="#1E90FF" strokeWidth={5} />
  );
};

export default RoutePolyline;
