import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { isSecretWasCreatedOnDeviceStorageKey } from "../../constants/constants";
import { UrlConfig } from "../../constants/UrlConfig";
import { formatFileSize } from "../../utils/formatFileSize";
import { buildSecretUrl, groupLinkId } from "../../utils/groupLinkId";
import { Alert, Button, Icon } from "../UI/kit";

export const COPIED_RESET_MS = 1500;

export interface CreatedSecretSummary {
  oneTime: boolean;
  expiration: string;
  fileName?: string;
  fileSize?: number;
}

interface EncryptedMessageLinkProps {
  id: string;
  summary: CreatedSecretSummary;
  clearId: () => void;
  /** Shown as a ghost button on desktop for signed-in users. */
  onShowMine?: () => void;
}

const EncryptedMessageLink: React.FC<EncryptedMessageLinkProps> = ({
  id,
  summary,
  clearId,
  onShowMine,
}) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const url = buildSecretUrl(window.location.origin, UrlConfig.secretID, id);
  const expiresAt = dayjs(summary.expiration).format("DD.MM.YYYY HH:mm");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);

    setIsCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
  };

  const steps = [
    {
      title: t("encryptedLink.next.step1"),
      desc: t("encryptedLink.next.step1Desc"),
    },
    {
      title: t("encryptedLink.next.step2"),
      desc: t("encryptedLink.next.step2Desc"),
    },
    summary.oneTime
      ? {
          title: t("encryptedLink.next.step3OneTime"),
          desc: t("encryptedLink.next.step3OneTimeDesc", { date: expiresAt }),
        }
      : {
          title: t("encryptedLink.next.step3"),
          desc: t("encryptedLink.next.step3Desc", { date: expiresAt }),
        },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 text-left">
        <h1 className="font-heading text-xl font-semibold leading-8 tracking-tight md:text-[32px] md:leading-10">
          {t("encryptedLink.title")}
        </h1>
        <p className="text-muted">{t("encryptedLink.description")}</p>
      </div>

      <div className="ov-card text-left">
        {/* grouped link: display only, Copy uses the plain URL */}
        <div className="ov-copy">
          <output
            aria-label={t("encryptedLink.linkLabel")}
            data-testid="grouped-link"
          >
            <span className="host">
              {window.location.origin}
              {UrlConfig.secretID.replace(":id", "")}
            </span>
            {groupLinkId(id).map((group, i) => (
              <span key={i} className="grp">
                {group}
              </span>
            ))}
          </output>
          <Button
            variant={isCopied ? "secondary" : "primary"}
            className={isCopied ? "is-copied" : undefined}
            onClick={copyToClipboard}
            title={t("encryptedLink.tooltips.copyToClipboard")}
          >
            <Icon name={isCopied ? "check" : "copy"} size={16} />
            {isCopied
              ? t("encryptedLink.copied")
              : t("encryptedLink.copyToClipboard")}
          </Button>
        </div>

        {/* live region: always mounted so the announcement is read */}
        <div aria-live="polite" className="flex justify-center empty:hidden">
          {isCopied && (
            <div className="ov-toast" data-testid="copied-toast">
              <Icon name="check" size={16} />
              {t("encryptedLink.toast")}
            </div>
          )}
        </div>

        {/* summary */}
        <div className="ov-chips">
          <span className="ov-chip">
            {summary.oneTime
              ? t("encryptedLink.chips.oneTime")
              : t("encryptedLink.chips.regular")}
          </span>
          <span className="ov-chip mono">
            {t("encryptedLink.chips.expires", { date: expiresAt })}
          </span>
          {summary.fileName && (
            <span className="ov-chip">
              <Icon name="file" size={14} />
              <span className="mono">
                {summary.fileName}
                {summary.fileSize !== undefined &&
                  ` · ${formatFileSize(summary.fileSize)}`}
              </span>
            </span>
          )}
        </div>

        {/* always visible reminder */}
        <Alert variant="info" title={t("encryptedLink.reminderTitle")}>
          {t("encryptedLink.reminder")}
        </Alert>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">
            {t("encryptedLink.next.title")}
          </span>
          <ol className="ov-steps">
            {steps.map((step, i) => (
              <li key={i}>
                <span>{i + 1}</span>
                <span>
                  <b>{step.title}</b>
                  <span className="d">{step.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            className="max-md:w-full"
            onClick={clearId}
            title={t("encryptedLink.tooltips.createAnother")}
          >
            {t("encryptedLink.createAnother")}
          </Button>
          {onShowMine && (
            <Button variant="ghost" className="max-md:hidden" onClick={onShowMine}>
              {t("dashboard.heading")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default EncryptedMessageLink;
