BEGIN TRANSACTION;

INSERT INTO public.users(id, name, email, entries, joined) VALUES (default, 'Testy McTestify', 'testmctestify@test.hu', 0, '2020-03-08 17:31:58.896');
INSERT INTO public.login(id, hash, email) VALUES (default, '$2a$10$Nk28ER/jJSOqcozCsgCp9O1MSJsNnlEppesOouOQDBED5AYC2uN6C', 'testmctestify@test.hu');
INSERT INTO public.users(id, name, email, entries, joined) VALUES (default, 'a', 'a@a.hu', 0, '2020-03-08 17:31:59.006');
INSERT INTO public.login(id, hash, email) VALUES (default, '$2a$10$dyQPYUMxijvOCrPG5aqLkOKSWbH7QqMOQ7QONF6c5vXHH26lbrjue', 'a@a.hu');
INSERT INTO public.users(id, name, email, entries, joined) VALUES (default, 'b', 'b@b.hu', 0, '2020-10-29 11:27:00.000');
INSERT INTO public.login(id, hash, email) VALUES (default, '$2a$10$9ooDt0nNd.5b91n4P2KBJ.gWaltLYwNuxbTff7MgsCuUKZaX9P26a', 'b@b.hu');

COMMIT;