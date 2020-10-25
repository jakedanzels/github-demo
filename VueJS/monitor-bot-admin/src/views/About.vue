<template>
  <div class="about">
    <h1>Monitor Bot</h1>
    <hr>
    <!-- <h2>What does it do?</h2> -->
    <p>The Monitor Bot job runs every 5 minutes.</p>
    <p>It works out which items are due to be checked based on the user-specified schedule.
    <br>
    If the check fails, it will post a message on the slack #sql_alerts channel.
    <br>
    If a check passes which previously failed, it will optionally give us that feedback.
    </p>
    <p>"Items" are user-defined SQL statements which will return <strong>exactly one</strong> column of data <u>only if there's a problem</u></p>
    <div style="text-align: center;">
      <div style="display: inline-block; text-align: left;">
          e.g.<br>
          <i>SELECT ed.Fullname + ' - ' + ed.JobTitle AS [ColumnNameIsNotImportant]
          <br>
          FROM dbo.CMEmployeeDetails ed
          <br>
          WHERE ed.IsActive = 1
          <br>
          AND ed.IsVacancy = 0
          <br>
          AND ed.ITUsername IS NULL</i>
          <br><br>
      </div>
    </div>
    <h2>How does it work?</h2>
    <p>In a cursor, the statement provided by each item is dynamically executed INTO a single-columned #temp table
    <br>The presence of <i>anything</i> in the temp table indicates there's a problem, and the contents of the temp table can optionally be returned in the slack message.
    </p>
    <p>Because of nesting issues, any checks involving the dynamic execution of SQL are likely to need some extra work inside the main proc (MonitorBot.dbo.spMasterMonitor)
    <br>
    Such items must have "Has Bespoke Pre-Cursor Logic" checked.
    </p>
    <h2>Set-up</h2>
    <p>Items can be a simple SELECT statement or wrapped in a PROCEDURE.
    <br>
    Slack formatting is automatically applied, so keep it plain.
    <br>
    Make sure to use fully-qualified names (or synonyms) when creating new items in the MonitorBot database!
    <br>
    Once you have a valid check, add it <router-link to="/">here</router-link> and choose an appropriate frequency/shedule
    <br><br>
    It's also possible for MonitorBot to run a SQL statement in response to a failed check.
    <br>
    In the above example, it could run a proc which e-mails the IT Helpdesk telling them which staff need their ITUsername hooking up to BM!
    </p>
    <h2>What should be added to Monitor Bot?</h2>
    <p>Whenever you solve a problem which cannot be permanently fixed and is queryable, you should be wondering if it can be added to Monitor Bot.
    <br>
    5 minutes work could save someone all the pain you just went through!
    </p>
  </div>
</template>
