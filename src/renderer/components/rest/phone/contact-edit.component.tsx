import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Sidebar } from "Renderer/components/core/table/table.component"
import styled from "styled-components"
import { Contact } from "Renderer/models/phone/phone.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { useForm } from "react-hook-form"
import { noop } from "Renderer/utils/noop"

const messages = defineMessages({
  editTitle: { id: "view.name.phone.contacts.edit.title" },
  newTitle: { id: "view.name.phone.contacts.new.title" },
  firstName: { id: "view.name.phone.contacts.edit.firstName" },
  secondName: { id: "view.name.phone.contacts.edit.secondName" },
  number: { id: "view.name.phone.contacts.edit.number" },
  otherNumber: { id: "view.name.phone.contacts.edit.otherNumber" },
  email: { id: "view.name.phone.contacts.edit.email" },
  speedDialKeySelect: {
    id: "view.name.phone.contacts.edit.speedDialKeySelect",
  },
  speedDialKey: { id: "view.name.phone.contacts.edit.speedDialKey" },
  speedDialSettings: { id: "view.name.phone.contacts.edit.speedDialSettings" },
  addToFavourites: { id: "view.name.phone.contacts.edit.addToFavourites" },
  iceContact: { id: "view.name.phone.contacts.edit.iceContact" },
  address: { id: "view.name.phone.contacts.edit.address" },
  notes: { id: "view.name.phone.contacts.edit.notes" },
  cancel: { id: "view.name.phone.contacts.edit.cancel" },
  save: { id: "view.name.phone.contacts.edit.save" },
})

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.8rem;

  > div {
    width: calc(50% - 3.2rem);
  }

  select {
    height: 1.8rem;
    margin-top: 3.8rem;
    margin-bottom: 0.7rem;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  width: fit-content;
  margin: 4.8rem 0 4.8rem auto;

  button {
    width: auto;
  }
`

const Input = styled(InputComponent)<InputComponentProps>`
  margin-top: 1.8rem;

  input {
    font-weight: ${fontWeight("default")};
  }
`

const SecondaryInput = styled(Input)`
  margin-top: 0.5rem;
`

const SpeedDialSettings = styled(ButtonComponent)`
  padding: 0.9rem;
  height: auto;
  width: auto;
`

const SpeedDial = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  ${Input} {
    width: 8rem;
    background-color: transparent;
  }
`

const ContactDetailsWrapper = styled(Sidebar)`
  margin-top: 6.3rem;
`

const CustomCheckbox = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.3rem;
  padding-bottom: 1.4rem;
  cursor: pointer;

  p {
    margin: 0 0.8rem 0 1.2rem;
    text-transform: initial;
  }
`

export const defaultContact = {
  id: "",
  firstName: "",
  lastName: "",
  phoneNumbers: ["", ""],
  email: "",
  note: ["", ""],
  address: ["", ""],
  favourite: false,
  blocked: false,
  speedDial: undefined,
  ice: false,
} as Readonly<Contact>

type NameUpdateProps = Pick<Contact, "firstName" | "lastName">

interface ContactEditProps {
  contact?: Contact
  onCancel: () => void
  onSpeedDialSettingsOpen: () => void
  onSave: (contact: Contact) => void
  onNameUpdate?: ({ firstName, lastName }: NameUpdateProps) => void
}

const ContactEdit: FunctionComponent<ContactEditProps> = ({
  contact,
  onCancel,
  onSave,
  onSpeedDialSettingsOpen,
  onNameUpdate = noop,
  ...rest
}) => {
  const { register, handleSubmit, watch } = useForm()

  console.log(watch())

  const handleSave = () => {
    handleSubmit(data => {
      console.log(data)
    })
    // if (allValid) {
    //   onSave(fields)
    // }
  }

  const headerLeft = (
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={contact ? messages.editTitle : messages.newTitle}
    />
  )
  //
  // const savingPossible =
  //   fields.firstName ||
  //   fields.lastName ||
  //   fields.phoneNumbers[0] ||
  //   fields.phoneNumbers[1] ||
  //   fields.email ||
  //   fields.address[0] ||
  //   fields.note[0]
  //
  // useEffect(() => {
  //   onNameUpdate({ firstName: fields.firstName, lastName: fields.lastName })
  // }, [fields.firstName, fields.lastName])

  return (
    <ContactDetailsWrapper
      {...rest}
      show
      onClose={onCancel}
      headerLeft={headerLeft}
    >
      <Content>
        <div>
          <Input
            placeholder={intl.formatMessage(messages.firstName)}
            name="firstName"
            defaultValue={contact?.firstName}
            inputRef={register}
          />
          <Input
            placeholder={intl.formatMessage(messages.secondName)}
            name="lastName"
            inputRef={register}
          />
          <Input
            placeholder={intl.formatMessage(messages.number)}
            name="phoneNumbers[0]"
            inputRef={register}
          />
          <Input
            placeholder={intl.formatMessage(messages.otherNumber)}
            name="phoneNumbers[1]"
            inputRef={register}
          />
          <Input
            name="email"
            placeholder={intl.formatMessage(messages.email)}
            inputRef={register}
          />
        </div>
        <div>
          <SpeedDial>
            <select name="speedDial" ref={register}>
              <option value="">Select</option>
              {[...Array.from({ length: 10 })].map((_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
            <SpeedDialSettings
              displayStyle={DisplayStyle.Link3}
              labelMessage={messages.speedDialSettings}
              onClick={onSpeedDialSettingsOpen}
            />
          </SpeedDial>
          <CustomCheckbox>
            <InputCheckbox
              size={Size.Medium}
              defaultChecked={contact?.favourite}
              name="favourite"
              inputRef={register}
            />
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {intl.formatMessage(messages.addToFavourites)}
            </Text>
            <Icon type={Type.Favourites} height={1} />
          </CustomCheckbox>
          <CustomCheckbox>
            <InputCheckbox
              size={Size.Medium}
              name="ice"
              inputRef={register}
              defaultChecked={contact?.ice}
            />
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {intl.formatMessage(messages.iceContact)}
            </Text>
            <Icon type={Type.Ice} height={1} />
          </CustomCheckbox>
          <Input
            type="text"
            outlined={false}
            placeholder={intl.formatMessage(messages.address) + " line 1"}
            name="address[0]"
            maxLength={30}
            inputRef={register}
          />
          <SecondaryInput
            type="text"
            outlined={false}
            placeholder={intl.formatMessage(messages.address) + " line 2"}
            name="address[1]"
            maxLength={30}
            inputRef={register}
          />
          <Input
            type="text"
            outlined={false}
            placeholder={"Note line 1"}
            name="note[0]"
            maxLength={30}
            inputRef={register}
          />
          <SecondaryInput
            type="text"
            outlined={false}
            placeholder={"Note line 2"}
            name="note[1]"
            maxLength={30}
            inputRef={register}
          />
        </div>
      </Content>
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={messages.cancel}
          onClick={onCancel}
        />
        <ButtonComponent
          // disabled={!savingPossible || !allValid}
          labelMessage={messages.save}
          onClick={handleSave}
        />
      </Buttons>
    </ContactDetailsWrapper>
  )
}

export default ContactEdit
