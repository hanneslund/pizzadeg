CREATE TABLE doughs (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id uuid references auth.users not null,
  created timestamp without time zone NOT NULL,

  flour_weight real NOT NULL,
  water_percentage real NOT NULL,
  salt_percentage real NOT NULL,
  yeast_percentage real NOT NULL,

  mixed timestamp without time zone,
  balled timestamp without time zone,
  done timestamp without time zone
);

alter table doughs enable row level security;
CREATE POLICY "Enable all actions for users based on user_id." ON public.doughs FOR ALL USING (auth.uid() = user_id);

CREATE TABLE dough_steps (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  step text not null,
  dough_id bigint references doughs not null,
  created timestamp without time zone NOT NULL
);

alter table dough_steps enable row level security;
CREATE POLICY "Enable all actions for users based on dough_id." ON public.dough_steps USING (
  EXISTS (
    SELECT
      1
    FROM
      doughs
    WHERE
      doughs.id = dough_steps.dough_id
  )
);