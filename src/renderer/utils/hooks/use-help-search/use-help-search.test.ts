import { act, renderHook } from "@testing-library/react-hooks"
import { useHelpSearch } from "Renderer/utils/hooks/use-help-search/use-help-search"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import {
  contentfulSeed,
  seedAnswers,
  seedCollectionIds,
  seedQuestions,
} from "App/seeds/help"

const mockIpc = () =>
  ((ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...contentfulSeed,
    }),
  })

beforeEach(() => mockIpc())

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

test("return correct amount of data", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useHelpSearch())
  await waitForNextUpdate()
  expect(result.current.data.collection).toHaveLength(
    contentfulSeed.items.length
  )
})

test("callback works", async () => {
  const saveToStore = jest.fn()
  const { waitForNextUpdate } = renderHook(() => useHelpSearch(saveToStore))
  await waitForNextUpdate()
  expect(saveToStore).toBeCalled()
})

test("search works", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useHelpSearch())
  await waitForNextUpdate()
  act(() => {
    result.current.searchQuestion(seedQuestions[0])
    result.current.searchValue = seedQuestions[0]
  })
  expect(result.current.data.collection).toHaveLength(1)
})

test("collection contains desired ids", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useHelpSearch())
  await waitForNextUpdate()
  expect(result.current.data.collection).toEqual(seedCollectionIds)
})

test("result has desired structure", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useHelpSearch())
  await waitForNextUpdate()
  seedCollectionIds.forEach((id, index) => {
    expect(result.current.data.items[id]).toEqual(
      expect.objectContaining({
        id,
        question: seedQuestions[index],
        answer: seedAnswers[index],
      })
    )
  })
})
