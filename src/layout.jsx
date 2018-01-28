import React from "react"
import PropTypes from "prop-types"
import Dropzone from "react-dropzone"

export default class EditorLayout extends React.Component {

  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired
  }

  onChange = (newYaml) => {
    this.props.specActions.updateSpec(newYaml)
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert("Please drag and drop one (and only one) .yaml or .json swagger spec file.")
    } else if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        const spec = reader.result
        this.onChange(spec)
      }

      reader.readAsText(file, "utf-8")
    }
  }

  render() {
    let { getComponent } = this.props

    let UIBaseLayout = getComponent("BaseLayout", true)

    let Container = getComponent("Container")
    let EditorContainer = getComponent("EditorContainer", true)
    const SplitPaneMode = getComponent("SplitPaneMode", true)
 
    return (
      <div>
        <Container className='container'>
          <Dropzone
            className="dropzone"
            accept=".yaml,application/json"
            multiple={false}
            onDrop={this.onDrop}
            disablePreview
            disableClick
          >
          {({ isDragActive }) => {
            if (isDragActive) {
              return (
                <div className="dropzone__overlay">
                  Please drop a .yaml or .json swagger spec.
                </div>
              )
            } else {
              return (
                <SplitPaneMode>
                  <EditorContainer onChange={this.onChange} />
                  <UIBaseLayout/>
                </SplitPaneMode>
              )
            }
          }}
          </Dropzone>
        </Container>
      </div>

  )
  }

}
