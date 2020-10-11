import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormButtons = ({
  handleSave,
  getSaveTarget,
  handleCancel,
  saveIsDisabled
}) => {
  return (
    <>
      <Button
        bsstyle='primary'
        type='submit'
        onClick={e => {
          if (getSaveTarget) {
            handleSave(getSaveTarget(e))
          } else {
            handleSave(e)
          }
        }}
        disabled={saveIsDisabled ? saveIsDisabled : false}
        style={{ marginRight: 5 }}
      >
        Save
      </Button>
      <Button
        bsstyle='default'
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </>
  )
}

export default FormButtons

FormButtons.propTypes = {
  handleSave: PropTypes.func.isRequired,
  getSaveTarget: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  saveIsDisabled: PropTypes.bool
}