<Each
          of={rows}
          render={(row, rowIndex) => 
             (
              <>
                <tr key={rowIndex}>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => {
                        onClearRow(rowIndex)
                      }}
                    >
                      Clear
                    </Button>
                  </td>
                  <td>
                    {/* <Input /> */}
                    <AsyncSelect
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      value={
                        row?.DynCustomerID
                          ? {
                              value: row?.DynCustomerID,
                              label: row?.DynCustomerID,
                            }
                          : null
                      }
                      onChange={(DynCustomerID) => {
                        handleCustomerSelect(DynCustomerID, rowIndex)
                      }}
                      loadOptions={loadOptions}
                      defaultOptions={props.customerList.map((item, index) => ({
                        value: item.DynCustomerID,
                        label: (
                          <>
                            <table style={{ width: "100%" }}>
                              {index === 0 && (
                                <thead>
                                  <tr style={{ padding: "0" }}>
                                    <td
                                      style={{
                                        color: "white",
                                        backgroundColor: "#304961",
                                        width: "35%",
                                        textAlign: "left",
                                      }}
                                    >
                                      Customer ID
                                    </td>
                                    <td
                                      style={{
                                        backgroundColor: "#304961",
                                        color: "white",
                                        width: "65%",
                                        textAlign: "left",
                                      }}
                                    >
                                      Name
                                    </td>
                                  </tr>
                                </thead>
                              )}

                              <tbody>
                                <tr
                                  style={{
                                    backgroundColor: "#fff",
                                    color: "red",
                                  }}
                                >
                                  <td
                                    style={{
                                      width: "35%",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item?.DynCustomerID}
                                  </td>
                                  <td
                                    style={{
                                      width: "65%",
                                      textAlign: "left",
                                    }}
                                  >
                                    {item?.Name}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        ),
                      }))}
                      placeholder="Type to search..."
                      styles={customStyles}
                      // isClearable
                      // isDisabled={true}
                    />
                  </td>
                  <td>
                    <div className="d-flex">
                      <Input
                        value={row?.AddressId}
                        onChange={(e) =>
                          handleInputChange(e, "AddressId", rowIndex)
                        }
                      />
                      <Button
                        color="primary"
                        className="ml-1"
                        onClick={() => {
                          onAddressIdSelectHandle(row?.DynCustomerID, rowIndex)
                          setIndex(rowIndex)
                        }}
                      >
                        {rowIndex === index &&
                        selectModelFor === "AddressId" &&
                        loader ? (
                          <Spinner
                            style={{
                              width: "1.2rem",
                              height: "1.2rem",
                            }}
                            color="light"
                          />
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>
                  </td>
                  <td>
                    <Input
                      value={row?.company_name}
                      onChange={(e) =>
                        handleInputChange(e, "company_name", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.address}
                      onChange={(e) =>
                        handleInputChange(e, "address", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.address2}
                      onChange={(e) =>
                        handleInputChange(e, "address2", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.address3}
                      onChange={(e) =>
                        handleInputChange(e, "address3", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.country}
                      onChange={(e) =>
                        handleInputChange(e, "country", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.city}
                      onChange={(e) => handleInputChange(e, "city", rowIndex)}
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.post_code}
                      onChange={(e) =>
                        handleInputChange(e, "post_code", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <div className="d-flex">
                      <Input
                        value={row?.ContactId}
                        onChange={(e) =>
                          handleInputChange(e, "ContactId", rowIndex)
                        }
                      />
                      <Button
                        color="primary"
                        className="ml-1"
                        onClick={() => {
                          onContactIdSelectHandle(row.DynCustomerID)
                          setIndex(rowIndex)
                        }}
                      >
                        {rowIndex === index &&
                        selectModelFor !== "AddressId" &&
                        loader ? (
                          <Spinner
                            style={{
                              width: "1.2rem",
                              height: "1.2rem",
                            }}
                            color="light"
                          />
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>
                  </td>
                  <td>
                    <Input
                      value={row?.contact_person}
                      onChange={(e) =>
                        handleInputChange(e, "contact_person", rowIndex)
                      }
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.phone}
                      onChange={(e) => handleInputChange(e, "phone", rowIndex)}
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.fax}
                      onChange={(e) => handleInputChange(e, "fax", rowIndex)}
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                  <td>
                    <Input
                      value={row?.email}
                      onChange={(e) => handleInputChange(e, "email", rowIndex)}
                      disabled={row?.DynCustomerID}
                    />
                  </td>
                </tr>
              </>
            )
          }
        />
