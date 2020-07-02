import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  FiltersWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import styled, { css } from "styled-components"
import {
  Call,
  VisibilityFilter,
} from "App/renderer/models/calls/calls.interface"
import SelectionManager from "Renderer/components/core/selection-manager/selection-manager.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { showToggleableElement } from "Renderer/modules/tools/tabs/notes.styled"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { CallsHeaderTestIds } from "Renderer/components/rest/calls/calls-header-test-ids.enum"

const toggleState = [
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.allCallTypes",
    }),
    visibilityFilter: VisibilityFilter.All,
  },
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.receivedCalls",
    }),
    visibilityFilter: VisibilityFilter.Received,
  },
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.missedCalls",
    }),
    visibilityFilter: VisibilityFilter.Missed,
  },
] as const

const CallsButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 12.7rem;
`

const CallsFiltersWrapper = styled(FiltersWrapper)<{
  selectionMode: boolean
}>`
  border-bottom: none;
  padding: 0 0 0 4rem;
  grid-template-areas: "Filters";
  grid-template-columns: auto;
  grid-column-gap: unset;
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-areas: "Search";
      max-width: 69.5rem;
    `}
`

const CallsSelectionManager = styled(SelectionManager)`
  animation: ${showToggleableElement} ${transitionTime("quick")} forwards
    ${transitionTimingFunction("easeInOut")};
  grid-template-columns: 4.8rem 1fr;
  padding: 0 1.6rem;
  button {
    padding: 0.5rem 0.8rem;
  }
`

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
  selectedItemsCount: number
  allRowsSelected?: boolean
  toggleAll?: UseTableSelect<Call>["toggleAll"]
}

const CallsHeader: FunctionComponent<Props> = ({
  changeVisibilityFilter = noop,
  selectedItemsCount,
  toggleAll,
  allRowsSelected,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0].label)
  const getFilterByLabel = ({
    label,
    visibilityFilter,
  }: {
    label: string
    visibilityFilter: VisibilityFilter
  }) => {
    switch (visibilityFilter) {
      case VisibilityFilter.Received:
        changeVisibilityFilter(VisibilityFilter.Received)
        setActiveLabel(label)
        break
      case VisibilityFilter.Missed:
        changeVisibilityFilter(VisibilityFilter.Missed)
        setActiveLabel(label)
        break
      default:
        changeVisibilityFilter(VisibilityFilter.All)
        setActiveLabel(label)
        break
    }
  }
  const selectionMode = selectedItemsCount > 0
  return (
    <CallsFiltersWrapper checkMode selectionMode={selectionMode}>
      {selectionMode ? (
        <CallsSelectionManager
          selectedItemsNumber={selectedItemsCount}
          message={{ id: "view.name.phone.calls.selectionsNumber" }}
          onToggle={toggleAll}
          allItemsSelected={Boolean(allRowsSelected)}
          buttons={[
            <ButtonComponent
              key="delete"
              label={intl.formatMessage({
                id: "view.name.messages.templates.deleteButton",
              })}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={noop}
            />,
          ]}
          data-testid={CallsHeaderTestIds.SelectionManager}
        />
      ) : (
        <UnreadFilters data-testid={CallsHeaderTestIds.UnreadFilters}>
          <ButtonToggler>
            {toggleState.map(({ label, visibilityFilter }) => {
              const filter = () => getFilterByLabel({ label, visibilityFilter })
              return (
                <CallsButtonTogglerItem
                  key={visibilityFilter}
                  label={label}
                  onClick={filter}
                  active={activeLabel === label}
                  data-testid={visibilityFilter}
                />
              )
            })}
          </ButtonToggler>
        </UnreadFilters>
      )}
    </CallsFiltersWrapper>
  )
}

export default CallsHeader
