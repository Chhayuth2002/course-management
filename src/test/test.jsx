import { useState } from "react";
function AddRemoveMultipleInputFields() {
  const [inputFields, setInputFields] = useState([
    {
      fullName: "",
      emailAddress: "",
      salary: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        fullName: "",
        emailAddress: "",
        salary: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange = (chapIndex, lessIndex, evnt) => {
    const { name, value } = evnt.target;
    const chapterList = [...inputFields];

    list.chapters[chapIndex][name] = value;
    setInputFields(list);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {inputFields.map((data, index) => {
            const { fullName, emailAddress, salary } = data;
            return (
              <div className="row my-3" key={index}>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={fullName}
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="col">
                  <input
                    type="email"
                    onChange={(evnt) => handleChange(index, evnt)}
                    value={emailAddress}
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    onChange={(evnt) => handleChange(index, evnt)}
                    value={salary}
                    name="salary"
                    className="form-control"
                    placeholder="Salary"
                  />
                </div>
                <div className="col">
                  {inputFields.length !== 1 ? (
                    <button
                      className="btn btn-outline-danger"
                      onClick={removeInputFields}
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-sm-12">
              <button
                className="btn btn-outline-success "
                onClick={addInputField}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
}
export default AddRemoveMultipleInputFields;
