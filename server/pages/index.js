import { useState } from 'react'
import GraphViewer from '../components/GraphViewer'
import PageContainer from '../components/PageContainer'
import SkinResistanceSummary from '../components/SkinResistanceSummary'

export default function () {
  const [userId, setUserId] = useState("")

  return (
    <PageContainer>
      <GraphViewer userId={userId} setUserId={setUserId} />
      {userId && <SkinResistanceSummary userId={userId} />}
    </PageContainer>
  )
}
