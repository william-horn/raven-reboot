"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Text from "../Typography/Text";
import Heading from "../Typography/Heading";

const BarGraph = function({
  graph_title,
  x_axis_title,
  y_axis_title,
  x_axis_padding="",
  x_axis_x_overflow="overflow-hidden",
  x_axis_y_overflow="overflow-hidden",
  x_axis_marker_tilt,
  x_axis,
  x_axis_max_markers=x_axis.length,
  y_axis
}) {
  // STATE AND REFS
  const [x_axis_width, set_x_axis_width] = useState(null);
  const [canvas_height, set_canvas_height] = useState(null);
  const [y_axis_height, set_y_axis_height] = useState(null);
  const x_axis_ref = useRef(null);
  const canvas_ref = useRef(null);
  const y_axis_ref = useRef(null);

  // CONSTS
  const x_axis_ratio = 1/x_axis_max_markers;
  const x_axis_spread = x_axis_ratio*100;

  const getYAxisMarkers = () => {
    const values = [];

    for (let marker = y_axis.max; marker >= y_axis.min; marker-=y_axis.step) {
      values.push(y_axis.fromFormat(marker));
    }

    return values;
  }

  const onWindowResize = () => {
    set_x_axis_width(x_axis_ref.current.clientWidth);
  }

  // Set up window-resize event listener to update chart sizes
  useLayoutEffect(() => {
    window.addEventListener("resize", onWindowResize);
    
    set_y_axis_height(y_axis_ref.current.clientHeight);
    onWindowResize();

    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, []);

  const renderYAxis = () => {
    return getYAxisMarkers().map(marker => {
      return <p key={marker} className="select-none">{marker}</p>
    })
  }

  const renderDataPoints = () => {
    return x_axis.map((data, index) => {
      const ratio = Math.min(data.quantity/y_axis.max, 1);
      const height = ratio*y_axis_height;
      const percent = Math.floor(ratio*100);

      return (
        <div 
        key={uuidv4()} 
        style={{
          minHeight: "1rem",
          maxHeight: "calc(100%-2rem)",
          height: `${height}px`,
          // height: "40px",
        }}
        className="bg-blue-500 min-w-[5rem] max-w-[5rem]">
          <Text className={{ self: `text-center relative -translate-y-1/2 select-none` }}>{`${percent}%`}</Text>
        </div>
      )
    })
  }

  const renderXAxis = () => {
    return x_axis.map((data, index) => {
      // const pos_x_shift = x_axis_spread/2;
      // const pos_x = x_axis_spread*index + pos_x_shift;
      const rot = x_axis_marker_tilt || 0;

      let tr_x = "";

      if (x_axis_marker_tilt !== undefined) {
        tr_x = "translate-x-1/2";
      }

      return (
        <p 
        key={index} 
        style={{
          // top: "0.3rem",
          // left: `${pos_x}%`,
          rotate: `${rot}deg`,
          // transform: "translate(-50%, 0)";
        }}
        className={`${tr_x} min-w-[5rem] h-fit text-sm text-center whitespace-nowrap relative group cursor-default overflow-hidden select-none`}>
          {data.name}
          <span className="absolute right-0 hidden p-1 text-white transition-all bg-black rounded -top-2 group-hover:inline">{data.name}</span>
        </p>
      );
    })
  }

  console.log("Width: ", x_axis_width);

  return (
    <div className="chart">
      <Heading className={{ self: "text-3xl" }}>{graph_title} {x_axis_width}</Heading>

      <div className="flex p-3 chart-body" ref={x_axis_ref}>

        {/* CHART Y-AXIS */}
        <div className="flex flex-col y-axis-container">
          <div ref={y_axis_ref} className="y-axis w-[3rem] flex flex-col gap-10 items-end pr-2">
            {renderYAxis()}
          </div>
          <div className="w-[3rem] h-[3rem]"></div>
        </div>


        {/* CHART CONTENT & X-AXIS */}
        <div className="overflow-y-hidden">
          <div className="flex flex-col justify-end h-full chart-canvas-container" ref={canvas_ref}>

            {/* include: items-end */}
            <div className="flex items-end w-fit h-full gap-5 chart-canvas border-b-[1px] border-b-gray-400">
              {renderDataPoints()}
            </div>

            <div className="flex gap-5 x-axis h-[3rem] flex-nowrap items-center">
              {renderXAxis()}
            </div>

          </div>
        </div>
      </div> 
    </div> 

    /*
    {Main chart content}
    {/*
    <div className="pb-2 overflow-x-auto chart-content">
      
      <div className="flex w-full chart-upper">
        <div className="w-[3rem] y-axis flex flex-col justify-evenly gap-6 items-end pr-2">
          {
            getYAxisMarkers().map(marker => {
              return <p key={marker} className="">{marker}</p>
            })
          }
        </div>
        <div className="flex w-full gap-2 bg-blue-500 chart-canvas">
          {
            x_axis.map(data => {
              return (
                <div 
                key={uuidv4()} 
                className="bg-green-500">
                  {data.quantity}
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="ml-[3rem] chart-lower flex flex-col">
        <div className="bg-gray-500 h-[1px] my-1 w-full"></div>
        <div className={`${x_axis_padding} ${x_axis_y_overflow} x-axis w-fit relative flex justify-evenly gap-4`} ref={x_axis_ref}>
          {
            x_axis.map((data, index) => {
              // const pos_x_shift = x_axis_spread/2;
              // const pos_x = x_axis_spread*index + pos_x_shift;
              const rot = x_axis_marker_tilt || 0;

              let tr_x = "";

              if (x_axis_marker_tilt !== undefined) {
                tr_x = "translate-x-1/2";
              }

              return (
                <p 
                key={index} 
                style={{
                  // top: "0.3rem",
                  // left: `${pos_x}%`,
                  rotate: `${rot}deg`,
                  // transform: "translate(-50%, 0)";
                }}
                className={`${tr_x} w-fit h-fit text-sm text-center whitespace-nowrap relative group cursor-default`}>
                  {data.name}
                  <span className="absolute top-0 left-0 hidden text-white transition-all bg-black group-hover:inline">test</span>
                </p>
              );
            })
          }
        </div>
      </div>
    </div>
    */
  );
}


export default BarGraph;