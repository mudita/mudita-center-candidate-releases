import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3.2rem 3rem 1rem 4rem;
`

const SearchInput = styled(InputComponent)`
  min-width: 39rem;
`

interface PanelInterface {
  onSearchTermChange: (event: string) => void
}

const ContactPanel: FunctionComponent<PanelInterface> = ({
  onSearchTermChange,
}) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(target.value)
  }
  return (
    <Panel>
      <SearchInput
        type="search"
        leadingIcons={[<Icon key={1} />]}
        placeholder="Search contacts"
        onChange={onChange}
      />
      <div>
        <button>Manage</button>
        <button>New contact</button>
      </div>
    </Panel>
  )
}

export default ContactPanel