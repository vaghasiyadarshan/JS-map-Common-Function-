import BlockUi from "react-block-ui"
import { Spinner } from "reactstrap"

const BlockUiWrapper = (props) => {
  return (
    <BlockUi
      blocking={props.blocking}
      loader={
        <Spinner
          style={{
            height: "3rem",
            width: "3rem",
          }}
          color="primary"
        />
      }
    >
      {props.children}
    </BlockUi>
  )
}

export default BlockUiWrapper
