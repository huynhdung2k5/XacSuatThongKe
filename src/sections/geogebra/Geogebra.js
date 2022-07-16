import { useEffect, useRef, useState } from "react";

// Geogebra
import Geogebra from "react-geogebra";
// Components
import LoadingScreen from "src/components/LoadingScreen";

export default function GeoGebra(props) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div ref={ref}>
      {width && (
        <Geogebra
          appName="classic"
          language="vi"
          showZoomButtons
          showFullscreenButton
          showMenuBar={false}
          showToolBarHelp={false}
          showLogging={false}
          width={width}
          autoHeight
          LoadComponent={() => <LoadingScreen />}
          {...props}
        />
      )}
    </div>
  );
}
